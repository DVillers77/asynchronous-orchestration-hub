// API Endpoints
const USELESS_FACT_API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random";
const CAT_FACT_API_URL = "https://catfact.ninja/fact";
const DOG_API_URL = "https://dog.ceo/api/breeds/image/random";
const ADVICE_API_URL = "https://api.adviceslip.com/advice";

/**
 * 1. Fetches a random Useless fact.
 */
function fetchRandomFact() {
  const outputElement = document.getElementById("fact-output");
  outputElement.textContent = "Loading Useless fact...";
  outputElement.classList.add("loading-text");

  fetch(USELESS_FACT_API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      outputElement.textContent = data.text;
      outputElement.classList.remove("loading-text");
    })
    .catch((error) => {
      console.error("Useless Fact Fetch error:", error);
      outputElement.textContent = "Failed to load Useless fact. (API Error)";
      outputElement.classList.add("loading-text");
    });
}

/**
 * 2. Fetches a random Cat fact.
 */
function fetchRandomCatFact() {
  const outputElement = document.getElementById("cat-output");
  outputElement.textContent = "Loading Cat fact...";
  outputElement.classList.add("loading-text");

  fetch(CAT_FACT_API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Cat Facts API returns JSON
      return response.json();
    })
    .then((data) => {
      // Cat Facts API uses a property named 'fact'
      outputElement.textContent = data.fact;
      outputElement.classList.remove("loading-text");
    })
    .catch((error) => {
      console.error("Cat Fact Fetch error:", error);
      outputElement.textContent = "Failed to load Cat fact. (API Error)";
      outputElement.classList.add("loading-text");
    });
}

/**
 * 3. Fetches a random dog image URL. (Logic remains the same)
 */
function fetchRandomDogImage() {
  const imgElement = document.getElementById("dog-image");
  const loadingText = document.getElementById("image-loading-text");

  loadingText.textContent = "Fetching a very good boy/girl...";
  loadingText.style.display = "block";
  imgElement.style.display = "none";

  fetch(DOG_API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const imageUrl = data.message;
      imgElement.src = imageUrl;

      imgElement.onload = () => {
        loadingText.style.display = "none";
        imgElement.style.display = "block";
      };

      imgElement.onerror = () => {
        loadingText.textContent = "Error: Failed to load image from API.";
        loadingText.style.display = "block";
        imgElement.style.display = "none";
      };
    })
    .catch((error) => {
      console.error("Dog Image Fetch error:", error);
      loadingText.textContent = "Failed to connect to the Dog API. (API Error)";
      loadingText.style.display = "block";
      imgElement.style.display = "none";
    });
}

/**
 * 4. Fetches a random piece of life advice.
 */
function fetchAdvice() {
  const outputElement = document.getElementById("advice-output");
  outputElement.textContent = "Consulting the oracle, hmmm...";
  outputElement.classList.add("loading-text");

  fetch(ADVICE_API_URL)
    .then((response) => {
      // THE FIX: Explicitly check response.ok to catch 429/404 errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Advice API returns data in the 'slip' object
      outputElement.textContent = `"${data.slip.advice}"`;
      outputElement.classList.remove("loading-text");
    })
    .catch((error) => {
      console.error("Advice Fetch error:", error);
      outputElement.textContent = "The oracle is silent. (Check Console for API Error)";
      outputElement.classList.add("loading-text");
    });
}
