// async和promise使用场景差别
// async与promise.all
function longTimeExecute(taskName) {
  return new Promise(resolve => {
    console.log(`before execute~:${taskName}`);
    setTimeout(() => {
      console.log(`finish execute~:${taskName}`);

      resolve(taskName);
    }, 500);
  });
}

async function init() {
  let album = initAlbum();
  let userInfo = initLoginInfo();
  let albumInfo = await album;
  if (album) {
    console.log(`print albumInfo:` + albumInfo);
    await userInfo;
  }
}
async function initAlbum() {
  let albumInfo = await longTimeExecute("album");
  return albumInfo;
}
async function initLoginInfo() {
  let userInfo = await longTimeExecute("userInfo");
  return userInfo;
}
