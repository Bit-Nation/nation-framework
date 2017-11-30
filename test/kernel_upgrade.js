// const { assertRevert } = require('./helpers/assertThrow')
// const Kernel = artifacts.require('Kernel')
// const KernelProxy = artifacts.require('KernelProxy')
// const UpgradedKernel = artifacts.require('UpgradedKernel')
//
// contract('Kernel Upgrade', accounts => {
//     let kernel = {};
//     let kernelProxy = {};
//
//     const permissionsRoot = accounts[0];
//
//     before(async () => {
//         const kernelImpl = await Kernel.new();
//         kernelProxy = await KernelProxy.new(kernelImpl.address)
//         kernel = Kernel.at(kernelProxy.address)
//         await kernel.initialize(permissionsRoot)
//     });
// 	//
//     // it('fails to upgrade kernel without permission', async () => {
//     //     return assertRevert(async () => {
//     //         await kernel.upgradeKernel(accounts[0])
//     //     })
//     // })
// 	//
//     // it('fails when calling is upgraded on old version', async () => {
//     //     return assertRevert(async () => {
//     //         await UpgradedKernel.at(kernel.address).isUpgraded()
//     //     })
//     // })
//
// 	it('gets the correct number', async () => {
// 		let number = await kernel.getNumber();
// 		assert.equal(number.toNumber(), 0, "number should have been initialized to five");
// 		await kernel.setNumber(10);
// 		number = await kernel.getNumber();
// 		assert.equal(number.toNumber(), 10, "number should have been set to 10");
// 	});
//
//     it('successfully upgrades kernel', async () => {
//         const role = await kernel.UPGRADE_KERNEL_ROLE()
//         await kernel.createPermission(permissionsRoot, kernel.address, role, permissionsRoot)
//
//         const upgradedImpl = await UpgradedKernel.new();
//         await kernel.upgradeKernel(upgradedImpl.address);
//
//         assert.isTrue(await UpgradedKernel.at(kernelProxy.address).isUpgraded(), 'kernel should have been upgraded')
//     });
//
// 	it('gets the correct number', async () => {
// 		let newkernel = UpgradedKernel.at(kernelProxy.address)
// 		let number = await newkernel.getNumber();
// 		console.log(number);
// 		assert.equal(number.toNumber(), 10, "number should have stayed at 10");
// 		assert.isTrue(await newkernel.isUpgraded(), 'kernel should have been upgraded')
// 	})
// });
