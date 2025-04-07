import schedule from "node-schedule";
import osUtils from "os-utils";

// Function to restart the server
const restartServer = () => {
  process.exit(0);
};

// Check CPU usage
const checkCPUUsage = () => {
  osUtils.cpuUsage((usage) => {
    const cpuPercentage = usage * 100;
    console.log(`Current CPU Usage: ${cpuPercentage.toFixed(2)}%`);

    if (cpuPercentage > 70) {
      console.log("High CPU Usage Detected! Restarting server...");
      restartServer();
    }
  });
};

export const enableScheduer = () => {
  console.log("CPU Monitoring Service Started...");

  schedule.scheduleJob("*/10 * * * * *", () => {
    checkCPUUsage();
  });
};
