//const DEFAULT_AVATAR = "/images/png-clipart-computer-icons-user-profile-user-avatar-blue-heroes.png";
const DEFAULT_AVATAR = "#";
const MY_NICKNAME = "Это я";

var refreshIntervalId;

let oBoard = {
  userList: [],
  myUser: {
    nickname: "user",
    peer: false,
    avatar: DEFAULT_AVATAR,
    unread: [],
    state: 1
  },
  talkUser: false,
}



function createUserCard(usrInfo) {

  const onLabelClick = function () {
    setTalkUser(usrInfo);
    connect(oBoard.talkUser.peer);
  }
  const card = document.createElement("span");
  card.classList.add("board-middle-desk-card");

  /*
  const avatar = document.createElement("img");
  avatar.src = usrInfo.avatar;
  avatar.alt= `Аватар для ${usrInfo.nickname}`;
  card.appendChild(avatar);
*/
  const label = document.createElement("a");
  label.href = "#";
  label.innerHTML = usrInfo.nickname;
  label.addEventListener("click", onLabelClick);
  card.appendChild(label);
  
  return card;
}

function createTalkHeader(usrInfo) {
  const talkHeader = document.createElement("div");

  const title = document.createElement("span");
  title.classList.add("board-header-talk");
  title.innerHTML = usrInfo.nickname;
  talkHeader.appendChild(title);

  const avatar = document.createElement("img");
  avatar.src = usrInfo.avatar;
  avatar.alt= `Аватар для ${usrInfo.nickname}`;
  talkHeader.appendChild(avatar);

  return talkHeader;
}


function renderHederTalk(header) {

  const user = oBoard.talkUser;

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.classList.add("board-header-talk");
  const tbox = document.createElement("div");
  const title = document.createElement("h1");
  title.innerHTML = oBoard.talkUser.nickname;
  tbox.appendChild(title);
  wrapper.appendChild(tbox);

  const image = document.createElement("img");
  image.src = user.avatar;
  wrapper.appendChild(image);

  header.appendChild(wrapper);  
  return wrapper  ;
}

function renderHederDesk(header) {

}

function renderHeader() {
  
  const header = document.querySelector(".board-header");
  header.innerHTML = "";

  if (oBoard.talkUser) {

    renderHederTalk(header);
  } else {
    renderHederDesk(header);
  }
  return header;
}

function renderMiddleTalk(middle) {
  const user = oBoard.talkUser;

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.classList.add("board-middle-talk");

  const dialog = document.createElement("textarea");
  dialog.classList.add("board-middle-talk-dialog");
  dialog.wrap="soft";
  dialog.disabled = true;
  wrapper.appendChild(dialog);

  const letter = document.createElement("textarea");
  letter.classList.add("board-middle-talk-letter");
  letter.wrap="soft";
  wrapper.appendChild(letter);

  //<textarea placeholder="Type message.." name="msg" required></textarea>
  middle.appendChild(wrapper);
  return wrapper;
}

function renderMiddleDesk(middle) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.classList.add("board-middle-desk");


  for (let i = 0; i < oBoard.userList.length; i += 1) {
    usrInfo = oBoard.userList[i];
    if (usrInfo.peer !== oBoard.myUser.peer) {
      wrapper.appendChild(createUserCard(usrInfo));
    }
  }
  middle.appendChild(wrapper);
  return wrapper;
}

function renderMiddle() {
  const middle = document.querySelector(".board-middle");
  middle.innerHTML = "";

  if (oBoard.talkUser) {
    renderMiddleTalk(middle);
  } else {
    renderMiddleDesk(middle);
  }
  return middle;
}

function renderFooterTalk(footer) {
  const user = oBoard.talkUser;

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.classList.add("board-footer-talk");

  const btnSend = document.createElement("button");
  btnSend.classList.add("board-footer-talk-send");
  btnSend.addEventListener("click", sendTextMessage); 
  btnSend.innerHTML = "Send";  
  wrapper.appendChild(btnSend);

  const btnClose = document.createElement("button");
  btnClose.classList.add("board-footer-talk-close");
  btnClose.innerHTML = "Close"; 
  btnClose.addEventListener("click", () => setTalkUser(false)); 
  wrapper.appendChild(btnClose);

  footer.appendChild(wrapper);
  return wrapper;
}

function renderFooterDesk(footer) {

  return footer;
}

function renderFooter() {

  const footer = document.querySelector(".board-footer");
  footer.innerHTML = "";
  if (oBoard.talkUser) {
    renderFooterTalk(footer);
  } else {
    renderFooterDesk(footer);
  }
  return footer;
}

function render() {
  
  renderHeader();
  renderMiddle();
  renderFooter();
}



function sendTextMessage() {
  
  const letter = document.querySelector(".board-middle-talk-letter");
  if (letter.value) {
    //console.log(textArea.value);
    const data = {
      sender: JSON.stringify(oBoard.myUser),
      receiver: JSON.stringify(oBoard.talkUser),
      text: letter.value,
    }
    sendChatMsg(oBoard.talkUser.peer, data);
    transmitChatMsg(data);
  }
  letter.value = "";
}

/**
 * dummy
 * @returns 
 */
function getUserList() {
  return [
    {
      nickname: "Алиев Александр",
      avatar: DEFAULT_AVATAR,
      state: 0,
    },
    {
      nickname: "Вьюшин Вячеслав",
      avatar: DEFAULT_AVATAR,
      state: 0,
    },
  ];
}

/**
 * отобразить список корреспондентов
 * @param {UserInfo[]} userList 
 */
 function setUserList(userList) {

  oBoard.userList = userList;
  render();
}

/**
 * назначить собеседника и переключить в соответсвующий режим
  * @param {UserInfo | any } usrInfo  если собеседник задан, переключаемся в режим беседы, иначе - в режим доски
 */
function setTalkUser(usrInfo) {
/* 
  if (usrInfo.nickname === MY_NICKNAME) {
    oBoard.talkUser = false;
  } else {
    oBoard.talkUser = usrInfo;
  }
 */  
  oBoard.talkUser = usrInfo;
  
  if (usrInfo) {
    clearInterval(refreshIntervalId);
  } else {
    refreshIntervalId = setInterval(() => {
      getListOfPeers()
    }, 1000);
  }
    

  render();
}

/**
 * назначить себя отправителем и переключить в режим доски
 * @param {UserInfo} usrInfo   это я
 */
function setMyUser(usrInfo) {
  oBoard.myUser = usrInfo;
  setTalkUser(false);
}

function transmitChatMsg(data) {
  const sender = JSON.parse(data.sender);
  const receiver = JSON.parse(data.receiver);
  const text = data.text;

  const timestamp = new Date();
  const subject = `${timestamp.toString()} from ${sender.nickname} to ${receiver.nickname}`;

  const dialog = document.querySelector(".board-middle-talk-dialog");
  dialog.value = `${dialog.value}\n\n${subject}\n${text}`;
}

/**
 * поучение спика пиров и передача их в представление в виде списка корреспондентов
 * @param {string[]} list 
 */
function transmitListOfPeers(list) {

  const userList = list.map(
     (item) => {
       //const name = item === oBoard.myUser.nickname ? MY_NICKNAME : item;
       const name = item;
       return {
        nickname: name,
        peer: item,
        avatar: DEFAULT_AVATAR,
        state: 1,
       }
      });

  setUserList(userList);
}

/**
 * инициализация. запускать при старте
 * назначить себя отправителем и переключить в режим доски
 * @param { UserInfo | string | never } usrInfo 
 */
function transmitMyUser(usrInfo) {


  if (typeof usrInfo === "string") {
    setMyUser({
      nickname: usrInfo,
      peer: usrInfo,
      avatar: DEFAULT_AVATAR,
      state: 1
    });
  } else if (typeof usrInfo === "object") {
    setMyUser(usrInfo);
  } else {
    setMyUser(false);
  }
  getListOfPeers();
}


function remoteCall(peerID) {

  const usr = oBoard.userList.find((item) => item.peer === peerID);
  setTalkUser(usr);
}