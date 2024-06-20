const SolarExchangeV2 = artifacts.require("SolarExchangeV2");

module.exports = async function (deployer) {
  await deployer.deploy(SolarExchangeV2);
};
