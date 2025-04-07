import { Worker } from "worker_threads";
import { Policy, User } from "../model.js";

export const uploadXl = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const worker = new Worker("./src/worker.js", {
    workerData: { filePath: req.file.path },
  });

  worker.on("message", (msg) => res.json(msg));
  worker.on("error", (err) => res.status(500).json({ error: err.message }));
};


export const getPolicyOfUser = async (req, res) => {
  const user = await User.findOne({ firstName: req.params.username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const policies = await Policy.find({ userId: user._id })
    .populate("carrierId", "name")
    .populate("lobId", "name")
    .populate("accountId", "name type");
    
  res.json({ user, policies });
};



export const getAllUserPolicies = async (req, res) => {
  const users = await User.aggregate([
    {
      $lookup: {
        from: "policies",
        localField: "_id",
        foreignField: "userId",
        as: "policies"
      }
    },
    {
      $project: {
        firstName: 1,
        email: 1,
        phone: 1,
        policies: {
          policyNumber: 1,
          policyType: 1,
          startDate: 1,
          endDate: 1,
          premiumAmount: 1
        }
      }
    }
  ]);

  res.json(users);
};



