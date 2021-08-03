const dataPanel = document.querySelector('#data-panel')

const toggleBtn = async e => {
  const favContainer = e.target.closest('.fav-container')
  const container =
    e.target.closest('.like-container') || e.target.closest('.fav-container')

  if (!container) return

  const url = e.target.closest('.like-container')
    ? `/like/${container.dataset.id}`
    : `/favorite/${container.dataset.id}`

  try {
    // Toggle button style
    const response = e.target.classList.contains('btn-primary')
      ? await axios.post(url)
      : await axios.delete(url)

    if (response.data.status === 'success') {
      console.log('----success----')
      container.innerHTML = Handlebars.compile(
        document.querySelector('#btn-template').innerHTML
      )(response.data)

      // Show restaurants' number of favorite in real time on top restaurants page
      if (document.querySelector('.fav-count')) {
        const favCountContainer =
          favContainer.previousElementSibling.previousElementSibling
            .previousElementSibling

        favCountContainer.innerHTML = Handlebars.compile(
          document.querySelector('#fav-count-template').innerHTML
        )(response.data)
      }
    }
  } catch (err) {
    console.log(err)
  }
}

if (dataPanel) {
  dataPanel.addEventListener('click', toggleBtn)
}
