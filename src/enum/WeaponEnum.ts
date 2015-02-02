/**
 * Created by tishoy on 15/1/31.
 * 武器枚举
 * 暂且在此记录，尚未完善，没有策划出表确实难做啊
 */
class WeaponEnum{
    /**
     * 雷达
     * 一次性，一次打开所有格子
     * @type {number[]}
     */
    static radarGrid:number[] = [-10, -9, -8, -1, 0, 1, 8, 9, 10];
    /**
     * 燃烧弹
     * 持续型1 每次进行所有 3次
     * @type {number[]}
     */
    static fireBoom: number[] = [-9, -1, 1, 9];
    /**
     * 愤怒的小鸟
     * 持续型2 每次进行一个 9次
     * * @type {number[]}
     */
    static angryBird:number[] = [-1, -9, +1, +1, +9, +9, -1, -1];
    /**
     * 飞毛腿
     * 一次性 击中就沉
     */
    static scud:number = 0;
} 