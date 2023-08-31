// create an action object using given arguments
export const action = (type) => (payload) => ({
  type,
  payload,
});

// convert snake cased keys to camel case
export const snakeToCamel = (arr) => {
  const array = Array.isArray(arr) ? arr : [arr];

  return array.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, p1) => p1.toUpperCase()),
        value,
      ]),
    ),
  );
};

// redirect from current page to targetUrl
export const redirectToPage = (targetUrl) => {
  window.location.href = targetUrl;
  return null;
};
