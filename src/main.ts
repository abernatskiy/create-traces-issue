import {MockDatabase} from '@belopash/mock-store'
import {processor} from './processor'

processor.run(new MockDatabase({supportHotBlocks: true}), async (ctx) => {
    console.log(`Got ${ctx.blocks.length} blocks`)
    for(let block of ctx.blocks) {
        for(let trc of block.traces) {
            if (trc.type === 'create' && trc.result?.address != null && trc.transaction?.hash !== undefined) {
                console.log({
                    id: `${trc.transaction.hash}-${trc.result.address}-${trc.transactionIndex}-${block.header.height}`,
                    block: block.header.height,
                    timestamp: new Date(block.header.timestamp),
                    address: trc.result.address,
//                    code: trc.result.code,
                    txHash: trc.transaction.hash,
                })
            }
        }
    }
})
