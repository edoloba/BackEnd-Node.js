function getCurrentDate() {
  return Date.now();
}

function toLocal() {
    return new Date(getCurrentDate()).toLocaleDateString();
}

module.exports = {
    getCurrentDate,
    toLocal
} 