export const isValidDate = (dateString: string) => {
  var regex = /^\d{4}-\d{2}-\d{2}$/

  if (!regex.test(dateString)) {
    return false
  }

  var date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return false
  }

  return true
}

export const filterNews = (
  selectedSources: any,
  allBreakingNewsData: any[],
  allNewsApiData: any[],
  allNewYorkTimesData: any[],
  allTheGuardianData: any[],
) => {
  if (
    !selectedSources ||
    selectedSources.length === 0 ||
    selectedSources.length === 3
  ) {
    return allBreakingNewsData
  }

  let filteredNews: any[] = []
  selectedSources.forEach((source: any) => {
    if (source.value === 1) {
      filteredNews = [...filteredNews, ...allNewsApiData]
    } else if (source.value === 2) {
      filteredNews = [...filteredNews, ...allNewYorkTimesData]
    } else if (source.value === 3) {
      filteredNews = [...filteredNews, ...allTheGuardianData]
    }
  })

  return filteredNews
}
