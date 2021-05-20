const DEFAULT_AVATAR = "/images/png-clipart-computer-icons-user-profile-user-avatar-blue-heroes.png";

let oBoard = {
  userList: [],
  myUser: {
    nickname: "user",
    avatar: DEFAULT_AVATAR,
    state: 1
  },
  talkUser: false,
}



function createUserCard(usrInfo) {

  const card = document.createElement("span");
  card.classList.add("board-middle-desk-card");

  const avatar = document.createElement("img");
  avatar.src = usrInfo.avatar;
  avatar.alt= `Аватар для ${usrInfo.nickname}`;
  card.appendChild(avatar);

  const label = document.createElement("a");
  label.href = "#";
  label.innerHTML = usrInfo.nickname;
  label.addEventListener("click", () => setTalkUser(usrInfo));
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


  const inbound = document.createElement("div");
  inbound.classList.add("board-middle-talk-inbound");
  wrapper.appendChild(inbound);

  const outbound = document.createElement("textarea");
  outbound.classList.add("board-middle-talk-textarea");
  outbound.placeholder ="Type message..";
  outbound.required = true;
  wrapper.appendChild(outbound);

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
    wrapper.appendChild(createUserCard(usrInfo));
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

/**
 * 
 * @param {UserInfo[]} userList 
 */
 function setUserList(userList) {

  oBoard.userList = userList;
  render();
}

function setTalkUser(usrInfo) {

  oBoard.talkUser = usrInfo;
  render();
}

function sendTextMessage(event) {

  const textArea = document.querySelector(".board-middle-talk-textarea");
  console.log(textArea.value);
  textArea.value = "";
}

function receiveTextMessage(text) {

  const textArea = document.querySelector(".board-middle-talk-inbound");
}
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


    //oBoard.myUser.nickname = prompt("Войти под имемем", "nickname");
//    oBoard.talkUser = getUserList()[0];

    const userList = getUserList();
    setUserList(userList);
