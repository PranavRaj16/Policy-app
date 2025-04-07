import { parentPort, workerData } from "worker_threads";
import xlsx from "xlsx";
import fs from "fs";
import { Account, Agent, Carrier, LOB, Policy, User } from "./model.js";
import { databaseConnection } from "./config/db.config.js";

databaseConnection();

async function processFile() {
  const workbook = xlsx.readFile(workerData.filePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  for (const row of data) {
    const excelToJSDate = (serial) => new Date((serial - 25569) * 86400000);
    let agent = await Agent.findOne({ name: row.agent });
    if (!agent) {
      agent = await new Agent({ name: row.agent }).save();
    }

    let user = await User.findOne({ email: row.email });
    if (!user) {
      user = await new User({
        firstName: row.firstname,
        dob: excelToJSDate(row.dob),
        email: row.email,
        phone: row.phone,
        address: row.address,
        city: row.city,
        state: row.state,
        zip: row.zip,
        userType: row.userType,
      }).save();
    }

    const account = await new Account({
      name: row.account_name,
      type: row.account_type,
      userId: user._id,
    }).save();

    let carrier = await Carrier.findOne({ name: row.company_name });
    if (!carrier) {
      carrier = await new Carrier({ name: row.company_name }).save();
    }

    let lob = await LOB.findOne({ name: row.category_name });

    if (!lob) {
      lob = await new LOB({ name: row.category_name }).save();
    }

    await new Policy({
      policyNumber: row.policy_number,
      policyType: row.policy_type,
      policyMode: row.policy_mode,
      startDate: excelToJSDate(row.policy_start_date),
      endDate: excelToJSDate(row.policy_end_date),
      premiumAmount: row.premium_amount,
      producer: row.producer,
      csr: row.csr,
      lobId: lob._id,
      carrierId: carrier._id,
      accountId: account._id,
      userId: user._id,
      agent: agent._id,
    }).save();
  }

  fs.unlinkSync(workerData.filePath);
  parentPort.postMessage({
    message: "File processed and data inserted successfully!",
  });
}

processFile().catch((err) => parentPort.postMessage({ error: err.message }));
