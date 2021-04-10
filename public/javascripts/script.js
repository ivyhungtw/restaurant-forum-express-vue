const dataPanel = document.querySelector('#data-panel')

const likeRestaurants = async e => {
  try {
    const theScriptHTML = document.querySelector('#likeBtn-template').innerHTML
    const theTemplate = Handlebars.compile(theScriptHTML)
    const likeContainer = e.target.closest('.like-container')
    if (likeContainer) {
      const response =
        e.target.textContent === 'Like'
          ? await axios.post(`/like/${likeContainer.dataset.id}`)
          : await axios.delete(`/like/${likeContainer.dataset.id}`)
      const compiledData = theTemplate(response.data)
      likeContainer.innerHTML = compiledData
    }
  } catch (err) {
    console.log(err)
  }
}

if (dataPanel) {
  dataPanel.addEventListener('click', likeRestaurants)
}
