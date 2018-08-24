function findOccurances(type) {
  if (type && type !== "custom") {
    let custSear = document.querySelector("#customSearch");
    custSear.value = "";
    custSear.parentNode.classList.remove("has-content");
  }

  const userInput = document.querySelector("#user_input").value;
  const customSearch = document.querySelector("#customSearch").value;

  let customSearchCount = type && type === "custom" && customSearch !== '' ? countCustomUsages(userInput, customSearch) : 0;
  let wordCount = countWords(userInput);
  let characterCount = countLetters(userInput);

  console.groupCollapsed('Find Occurances:')
    console.log(`Show common phrases by ${type} words.`),
    console.log(`Total custom search count: '${customSearchCount}'`),
    console.log(`Total word count: ${wordCount}`),
    console.log(`Total character count: ${characterCount}`)

  runReport([
    { id: "#common_phrase", value: customSearch },
    { id: "#total_word_count", value: wordCount },
    { id: "#total_character_count", value: characterCount },
    { id: "#times_used", value: customSearchCount }
  ]);
}

function cleanUserInput(input) {
  let cleaned = input.trim();
  return cleaned;
}

function countCustomUsages(target, input) {
  input = !input ? "" : input.replace("?", "\\?");
  const regexp = new RegExp(input, "gi");
  const cleaned = cleanUserInput(target).match(regexp);
  console.log(regexp, cleaned);
  return !cleaned || cleaned === null || cleaned < 0 ? 0 : cleaned.length;
}

function countWords(input) {
  const cleaned = cleanUserInput(input)
    .replace(/(\.)[^\w]/g, " ")
    .replace(/\.\s/g, "")
    .split(/\r|\s|\n|\./g)
    .map(function(v) {
      return v.trim();
    });
  return cleaned.length;
}

function countLetters(input) {
  const cleaned = cleanUserInput(input)
    .replace(/\./g, "")
    .split("");
  return cleaned.length;
}

function runReport(values) {
  values.forEach(function(v, i) {
    document.querySelector(v.id).textContent = v.value;
  });
}
