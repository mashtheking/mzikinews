import { useState, useEffect } from 'react'
import { isValidDate } from '../utils'

const useFilteredNewsByDate = ({
  searchQuery,
  selectedFromDay,
  selectedFromMonth,
  selectedFromYear,
  selectedToDay,
  selectedToMonth,
  selectedToYear,
}: any) => {
  const [filteredNewsData, setFilteredNewsData] = useState([])
  const [filterFromDate, setFilterFromDate] = useState('')
  const [filterToDate, setFilterToDate] = useState('')
  const [filterDateError, setFilterDateError] = useState('')

  useEffect(() => {
    const fetchFilteredNews = async () => {
      if (searchQuery.trim() === '') return

      const fromDay = selectedFromDay?.value
      const fromMonth = selectedFromMonth?.value
      const fromYear = selectedFromYear?.value

      const toDay = selectedToDay?.value
      const toMonth = selectedToMonth?.value
      const toYear = selectedToYear?.value

      const fromDateString = `${fromYear}-${fromMonth
        ?.toString()
        .padStart(2, '0')}-${fromDay?.toString().padStart(2, '0')}`

      const toDateString = `${toYear}-${toMonth
        ?.toString()
        .padStart(2, '0')}-${toDay?.toString().padStart(2, '0')}`

      const beginDateString = `${fromYear}${fromMonth
        ?.toString()
        .padStart(2, '0')}${fromDay?.toString().padStart(2, '0')}`

      const endDateString = `${fromYear}${fromMonth
        ?.toString()
        .padStart(2, '0')}${fromDay?.toString().padStart(2, '0')}`

      if (
        (isValidDate(fromDateString) && fromDateString < toDateString) ||
        (isValidDate(beginDateString) && beginDateString < endDateString)
      )
        setFilterFromDate(fromDateString)
      if (
        (isValidDate(toDateString) && fromDateString < toDateString) ||
        (isValidDate(endDateString) && beginDateString < endDateString)
      ) {
        setFilterToDate(toDateString)
      }

      if (fromDateString > toDateString || beginDateString > endDateString) {
        setFilterDateError('From date cannot be greater than To date')
        return
      } else {
        try {
          let newsApiSearchByQueryUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=a3906f4f790f4f2b8c917eb2f3a5621d`
          let NYTimesSearchByQueryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&api-key=uvXeQ3yYDdhDsKcSfRWkUAtOHN6tIVYe`
          let theGuardianSearchByQueryUrl = `https://content.guardianapis.com/search?q=${searchQuery}&page-size=20&show-fields=thumbnail&api-key=50887b5b-52a9-435f-b5e2-fd0a17568d18`

          if (selectedToDay && selectedToMonth && selectedToYear) {
            newsApiSearchByQueryUrl += `&from=${fromDateString}&to=${toDateString}`
            NYTimesSearchByQueryUrl += `&begin_date=${beginDateString}&end_date=${endDateString}`
            theGuardianSearchByQueryUrl += `&from-date=${fromDateString}&to-date=${toDateString}`
          }

          const newsApiResponse = await fetch(newsApiSearchByQueryUrl)
          const nYTimesApiResponse = await fetch(NYTimesSearchByQueryUrl)
          const theGuardianApiResponse = await fetch(
            theGuardianSearchByQueryUrl,
          )

          const newsApiData = await newsApiResponse.json()
          const nYTimesApiData = await nYTimesApiResponse.json()
          const theGuardianApiData = await theGuardianApiResponse.json()

          const mergedArray: any = [
            ...(newsApiData?.articles ?? []),
            ...(nYTimesApiData?.response?.docs ??
              nYTimesApiData?.articles ??
              []),
            ...(theGuardianApiData?.response?.results ??
              theGuardianApiData?.response?.docs ??
              []),
          ]

          setFilteredNewsData(mergedArray)
        } catch (error) {
          console.error('Error fetching filtered news data:', error)
        }
      }
    }
    fetchFilteredNews()
  }, [[filterFromDate, filterToDate]])
  useEffect(() => {
    const fetchFilteredNews = async () => {
      // Your existing logic goes here...
    }

    fetchFilteredNews()
  }, [filterFromDate, filterToDate])

  return { filteredNewsData, filterFromDate, filterToDate, filterDateError }
}

export default useFilteredNewsByDate
