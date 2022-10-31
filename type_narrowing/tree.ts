const enum EBtNode {
    Start = 'Start',
    Sequence = 'Sequence',
}

// 行为树节点基础接口
interface IBtNode<T extends EBtNode = EBtNode> {
    type: T;
    id: number;
    desc: string;
}    

// Start节点
interface IStartBtNode extends IBtNode<EBtNode.Start> {
    child?: TBtNode;
}

// Sequence节点
interface ISequenceBtNode extends IBtNode<EBtNode.Sequence> {
    children: TBtNode[];
}

type TBtNode = IStartBtNode | ISequenceBtNode;

// 展平行为树节点
function flatNode(node: TBtNode, idMap: Map<number, TBtNode>) {
    idMap.set(node.id, node);
    switch (node.type) {
        case EBtNode.Start:
            if (node.child) {
                flatNode(node.child, idMap);
            }
            break;
        case EBtNode.Sequence:
            node.children.forEach((n) => {
                flatNode(n, idMap);
            });
            break;

        default:
            break;
    }
}
