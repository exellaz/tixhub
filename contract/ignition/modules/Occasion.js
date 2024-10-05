// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const name = "ticket";
const symbol = "NFT";

module.exports = buildModule("TixHubModule", (m) => {
  const getName = m.getParameter("_name", name);
  const getSymbol = m.getParameter("_symbol", symbol);

  const lock = m.contract("TixHub", [getName, getSymbol]);

  return { lock };
});
