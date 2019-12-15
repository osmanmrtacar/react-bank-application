const url = "https://forecast-193-service.herokuapp.com/predict_api";

exports.request = data => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      krediMiktari: +data.Quantity,
      yas: +data.age,
      evDurumu: data.doesHaveHouse,
      aldigi_kredi_sayi: +loanBeforeCount,
      telefonDurumu: doesHavePhone
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => json);
};
