// deploy/01_deployStorage.js
module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    await deploy('Storage', {
      from: deployer,
      args: ['first'],
      log: true,
    });
  };
  module.exports.tags = ['Storage'];