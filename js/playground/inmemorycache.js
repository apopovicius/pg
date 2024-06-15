const refreshMyToken = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("async function done");
      resolve("Token from async function");
    }, 100);
  });
};

const cache = {
  data: { accessToken: "", refreshToken: "" },
  refresh: (expireMS) => {
    setTimeout(async () => {
      console.log("Token expired");
      cache.data.accessToken = await refreshMyToken();
    }, expireMS - 100);
  },
};

function test() {
  const token = {
    accessToken: "1234accesstoken",
    refreshToken: "1234refreshed",
    timeOutMS: 3000,
  };
  console.log(`[S1] -> cache token: ${cache.data.accessToken}`);
  cache.data.accessToken = token.accessToken;
  cache.data.refreshToken = token.refreshToken;
  cache.refresh(token.timeOutMS);
  setTimeout(() => {
    console.log(`[S2] -> cache token: ${cache.data.accessToken}`);
  }, 3100);
  console.log(`[S3] -> cache token: ${cache.data.accessToken}`);
}

test();
