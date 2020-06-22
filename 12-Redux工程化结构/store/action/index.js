/*
 * 合并所有的action-creator，类似于reducer合并，为了防止冲突，合并后的对象是以板块名称单独划分管理
 *   action={
 *      vote:{
 *         xxx(){}
 *      },
 *      ...
 *   }
 */
import vote from './vote';
import personal from './personal';

let action = {
  vote,
  personal
};
export default action;