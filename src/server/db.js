export function User() {
}

export function getUserById(userId) {
  return new Promise((resolve, reject) => {
    resolve(db[userId]);
  });
}

const qwer = new User();
qwer.id = "1";
qwer.username = "qwer";
qwer.password = "qwer";

const asdf = new User();
asdf.id = "2";
asdf.username = "asdf";
asdf.password = "asdf";

const zxcv = new User();
zxcv.id = "3";
zxcv.username = "zxcv";
zxcv.password = "zxcv";

const db = {
  [qwer.id]: qwer,
  [asdf.id]: asdf,
  [zxcv.id]: zxcv
};
