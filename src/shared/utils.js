export const groupArray = (arr, groupSize = 3) => {
  const result = [];
  for (let i = 0; i < arr.length; i += groupSize) {
    result.push(arr.slice(i, i + groupSize));
  }
  return result;
};

export function splitArrayIntoGroups(arr) {
  const result = [[], [], []];

  for (let i = 0; i < arr.length; i++) {
    const groupIndex = i % 3;
    result[groupIndex].push(arr[i]);
  }

  return result;
}

export function splitAndJoinString(input) {
  if (!input?.length) return;
  const sentences = input.split(".");

  const result = [];

  for (let i = 0; i < sentences.length; i += 3) {
    const subArray = sentences.slice(i, i + 3);
    // console.log(subArray);
    const filteredSubArray = subArray
      .filter((sentence) => sentence.trim() !== "")
      .filter(Boolean);
    const joinedString = filteredSubArray.join(". ").trim();
    result.push(joinedString);
  }

  return result;
}

export function normalizeContent(data) {
  let content = data;
  content = content.replaceAll("..", "");
  content = content.replaceAll("…", ".");
  content = content.replaceAll(/\(\s*\)/g, "");
  content = content.replaceAll(/\.(?=\d)/g, ",");
  content = content.replaceAll(/T.Ư/g, "Chính phủ");
  content = content.replaceAll(/TP.HCM/g, "Thành phố Hồ Chí Minh");

  // console.log(content);
  return content;
}
