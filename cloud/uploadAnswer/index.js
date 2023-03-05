const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
    env: "cloudbase-baas-5gbp91cgdef4798a"
  });
const db = app.database();// 获取数据库的引用
exports.main = async (event, context) => {
    const data = await db.collection("answer").add(event);
    return {
        code: 0,
        data: data,
        msg:"提交成功"
    }
}
