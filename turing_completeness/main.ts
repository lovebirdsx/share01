// 十位数以内的加减和比较，直接打表速度快
type PlusTable = [[0,1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[2,3,4,5,6,7,8,9],[3,4,5,6,7,8,9],[4,5,6,7,8,9],[5,6,7,8,9],[6,7,8,9],[7,8,9],[8,9],[9]]
type Plus<A extends number,B extends number> = PlusTable[A][B]
type MinusTable = [[0],[1,0],[2,1,0],[3,2,1,0],[4,3,2,1,0],[5,4,3,2,1,0],[6,5,4,3,2,1,0],[7,6,5,4,3,2,1,0],[8,7,6,5,4,3,2,1,0],[9,8,7,6,5,4,3,2,1,0],[10,9]]
type Minus<A extends number,B extends number> = MinusTable[A][B]
type LessTable = [[0,1,1,1,1,1,1,1,1,1],[0,0,1,1,1,1,1,1,1,1],[0,0,0,1,1,1,1,1,1,1],[0,0,0,0,1,1,1,1,1,1],[0,0,0,0,0,1,1,1,1,1],[0,0,0,0,0,0,1,1,1,1],[0,0,0,0,0,0,0,1,1,1],[0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0]]
type Lesser<A extends number,B extends number> = LessTable[A][B] extends 1?true:false
type MinusAbc<A extends number,B extends number> = Lesser<A,B> extends true?Minus<B,A>:Minus<A,B>


// 棋子建模，只有7种类型
// 0：帅 1：士 2：相 3：车 4：马 5：炮 6：兵
type CheeseIds = [0,1,2,3,4,5,6]
type CheeseName = [["帥","将"],["士","仕"],["相","象"],["车","車"],["马","馬"],["炮","砲"],["兵","卒"]]
type GetCheeseName<I> = I extends [infer CheeseId,infer IsRed]?
  IsRed extends  true?CheeseName[CheeseId&number][0]:CheeseName[CheeseId&number][1]:''
// 棋谱可能出现的中文字
type CheeseMap = {
  "帥":0,"将":0,"士":1,"仕":1,"相":2,"象":2,"车":3,"車":3,"马":4,"馬":4,"炮":5,"砲":5,"兵":6,"卒":6
}
type NumeralsMap = {"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}
type NumeralIndex = {
  "一":1,"二":2,"三":3,"四":4,"五":5,"六":6,"七":7,"八":8,"九":9,"十":10
}
type ToNum<J> =  J extends keyof NumeralsMap?NumeralsMap[J]:
  J extends keyof NumeralIndex?NumeralIndex[J]:never

// 棋子的分布，应该做成坐标和棋子类型的Mapped Type
// 考虑到坐标有x和y，这里只能用字符串来拼了
type CheeseDataType = {
  [key:string]:[number,boolean]
}
// 红在下面，黑在上面，红是汉字，黑是阿拉伯数字
// 黑旗的行动，由于黑旗在上面，它的X坐标和棋盘坐标系一致
// 黑的『进』是向下增加Y，『退』是减少Y
type ComputeBlackY<CheeseId,OldX extends number,Num extends number> = 
  CheeseId extends 1?1:
  CheeseId extends 2?2:
  MinusAbc<OldX,Num> extends 1?2:1
type NewBlackPoint<OldX extends number,OldY extends number,CheeseId,Type,Num extends number> = 
  // 平直接沿着水平方向运动，更改X坐标
  Type extends '平'?[Minus<Num,1>,OldY]:
  // 士、相、马都是走的斜边，数字代表X坐标点
  CheeseId extends 1|2|4?[
    Minus<Num,1>,
    Type extends '进'? Plus<OldY,ComputeBlackY<CheeseId,OldX,Minus<Num,1>&number>>:
      Minus<OldY,ComputeBlackY<CheeseId,OldX,Minus<Num,1>&number>>
  ]:
  // 直走的棋子，更改Y坐标
  [OldX,
    Type extends '进'? Plus<OldY,Num>:Minus<OldY,Num>
  ]

// 红棋的行动，由于红棋在下面，它的X坐标和棋盘X坐标相反
// 9-x才是对应的位置
// 红棋『进』是向上减少Y，『退』是增加Y
type NewRedPoint<OldX extends number,OldY extends number,CheeseId,Type,Num extends number> = 
  // 平直接沿着水平方向运动，更改X坐标
  Type extends '平'?[Minus<9,Num>,OldY]:
  // 士、相、马都是走的斜边，数字代表X坐标点
  CheeseId extends 1|2|4?[
    Minus<9,Num>,
    Type extends '进'? Minus<OldY,ComputeBlackY<CheeseId,OldX,Minus<9,Num>>>:
      Plus<OldY,ComputeBlackY<CheeseId,OldX,Minus<9,Num>>>
  ]:
  // 直走的棋子，更改Y坐标
  [OldX,Type extends '进'? Minus<OldY,Num>:Plus<OldY,Num>]

type NewPoint<Point,CheeseId,Type,Num extends number,IsRed extends boolean> =
  Point extends `${infer OldY}${infer OldX}`?
  IsRed extends true? NewRedPoint<ToNum<OldX>,ToNum<OldY>,CheeseId,Type,Num>:
  NewBlackPoint<ToNum<OldX>,ToNum<OldY>,CheeseId,Type,Num>:never

// 替换坐标
type ReplacePostion<Data,Old,New> = {
  [key in keyof Data as key extends Old?never:key]:key extends New?Data[Old&keyof Data]:Data[key]
}&{[key in New&string]:Data[Old&keyof Data]}
type Join<T extends number[]> = `${T[1]}${T[0]}`
// 四字棋谱解析
// 先找到旧的点，移动后进行替换
type Move<Data,S> = S extends `${infer I}${infer J}${infer K}${infer M}`?
  ReplacePostion<Data,FindOldPoint<Data,I,J,M>,
  Join<NewPoint<FindOldPoint<Data,I,J,M>,GetCheeseId<I,J>,K,ToNum<M>,
  IsRed<M>>>>:never

// 获取棋子类型
type GetCheeseId<I,J> = I extends '前'|'后'?
  CheeseMap[J&keyof CheeseMap]:CheeseMap[I&keyof CheeseMap]

type CheckChar<T extends string,M extends number,N extends number> = 
    T extends keyof CheeseMap?{
    [key in `${N}${M}`]:[CheeseMap[T],CheeseMap[T] extends keyof CheeseName?
        CheeseName[CheeseMap[T]][0] extends T?false:true:never]
}:unknown;
type CheckRow<T,M extends number> = T extends `┠${infer A} ${infer B} ${infer C} ${infer D} ${infer E} ${infer F} ${infer G} ${infer H} ${infer I}┨`?
    CheckChar<A,0,M>&CheckChar<B,1,M>&CheckChar<C,2,M>&CheckChar<D,3,M>&CheckChar<E,4,M>&CheckChar<F,5,M>&CheckChar<G,6,M>&CheckChar<H,7,M>&CheckChar<I,8,M>:never
type CheckRow1<T,M extends number> = unknown extends CheckRow<T,M >?never:CheckRow<T,M >

type ParseUnion<T> = {
    [key in keyof T]: T[key] extends "河"?never:CheckRow1<T[key],Minus<NumeralIndex[key&keyof NumeralIndex],1>>
}[keyof T]
type Parse<T> = Omit<UnionToIntersection<ParseUnion<T>>,never>
type Default =  {
    一: "┠车 马 相 士 帥 士 相 马 车┨";
    二: "┠〇 〇 〇 〇 〇 〇 〇 〇 〇┨";
    三: "┠〇 炮 〇 〇 〇 〇 〇 炮 〇┨";
    四: "┠兵 〇 兵 〇 兵 〇 兵 〇 兵┨";
    五: "┠〇 〇 〇 〇 〇 〇 〇 〇 〇┨";
    河: "┠ㄧ ㄧ ㄧ ㄧ ㄧ ㄧ ㄧ ㄧ ㄧ┨";
    六: "┠〇 〇 〇 〇 〇 〇 〇 〇 〇┨";
    七: "┠卒 〇 卒 〇 卒 〇 卒 〇 卒┨";
    八: "┠〇 砲 〇 〇 〇 〇 〇 砲 〇┨";
    九: "┠〇 〇 〇 〇 〇 〇 〇 〇 〇┨";
    十: "┠車 馬 象 仕 将 仕 象 馬 車┨";
}

type Qi2 = Parse<Default>
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
  true extends N ? [] : [...TuplifyUnion<Exclude<T, L>>, L]
// 过滤对应点
type FilterPoints<Data,CheeseId,IsRed> ={
  [key in keyof Data]:Data[key] extends [CheeseId,IsRed]?key:never
}[keyof Data]



type ColumnNum<Num extends number,IsRed extends Boolean> = 
  IsRed extends true?Minus<9,Num>:Minus<Num,1>

type IsRed<M> = M extends `${number}`?false:true
// 找到棋盘上对应的点
type FindOldPoint<Data,I,J,M,Points = FilterPoints<Data,GetCheeseId<I,J>,IsRed<M>>> = 
  I extends '前'? TuplifyUnion<Points>[0]: 
  I extends '后'?TuplifyUnion<Points>[1]:
  Points extends `${infer _}${ColumnNum<ToNum<J>,IsRed<M>>}`?Points:never;



// 渲染
type RenderItem<T,Row extends number,Col extends number> = 
  T extends {[k in `${Row}${Col}`]:any}?GetCheeseName<T[`${Row}${Col}`]>:'〇';


type RenderRow<T,N extends number> = 
`┠${RenderItem<T,N,0>} ${RenderItem<T,N,1>} ${RenderItem<T,N,2>} ${RenderItem<T,N,3>} ${RenderItem<T,N,4>} ${RenderItem<T,N,5>} ${RenderItem<T,N,6>} ${RenderItem<T,N,7>} ${RenderItem<T,N,8>}┨`
type Render<T> = {
  [key in "一"|"二"|"三"|"四"|"五"|"河"|"六"|"七"|"八"|"九"|"十"]:key extends '河'?
    "┠ㄧ ㄧ ㄧ ㄧ ㄧ ㄧ ㄧ ㄧ ㄧ┨":
    RenderRow<T,Minus<NumeralIndex[key&keyof NumeralIndex],1>>
}
type MoveMulitple<Data,S extends unknown[]> = 
  S extends []?Data:
  S extends [infer I,...infer O]?MoveMulitple<Move<Data,I>,O>:Data;


type X0 = Render<Qi2>

type X1 = Render<MoveMulitple<Qi2,[
  '炮二平五',
  '马8进7',
  '马二进三',
  '车9平8',
  '车一平二',
  '卒3进1']>>

