/**
 * ステータスを返す関数
 * @returns {Promise<{level: レベル,exp: 経験値,totalExp: 累計経験値,hp: 体力,atk: 攻撃力,def: 防御力,spd: スピード,point:ステータスポイント,coin:コイン,}>}
 */
export async function getStatus() {
  Status = await chrome.storage.local.get('status')
}
/**
 * ゲームフラグを返す関数
 * @returns {Promise<{stage: 最大クリア親ステージ,stageClear: [最大クリアステージ],}>}
 */
export async function getFlag() {
  flag = await chrome.storage.local.get('flag')
  console.log(flag)
}
/**
 * スキルのデータを返す関数
 * @returns {Promise<{setskill: [SkillId]}>}
 */
export async function getSkill() {
  const skill = await chrome.storage.local.get('gameSkill')
  return skill.gameSkill
}
