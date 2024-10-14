import useSWR from 'swr'
import axios from 'axios'

const {
  VITE_APP_NEWS_API_KEY,
  VITE_APP_NEW_YORK_TIMES_KEY,
  VITE_APP_THE_GUARDIAN_API_KEY,
} = import.meta.env

const newsApiKey = ''
const nYTimesKey = ''
const theGuardianAPiKey =
  VITE_APP_THE_GUARDIAN_API_KEY || '50887b5b-52a9-435f-b5e2-fd0a17568d18'

const newsApiAPiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${newsApiKey}`

const newYorkTimesArticlesUrl = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${nYTimesKey}`

const theGuardianAPiUrl = `https://content.guardianapis.com/search?&page-size=20&show-fields=thumbnail&api-key=${theGuardianAPiKey}`

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function useFetchNewsApiData() {
  const { data, error } = useSWR(newsApiAPiUrl, fetcher)

  return {
    allNewsApiData: data?.articles || [],
    isLoadingNewsApiData: !error && !data,
    isErrorNewsApiData: error,
  }
}

export function useFetchNewYorkTimesArticlesData() {
  const { data, error } = useSWR(newYorkTimesArticlesUrl, fetcher)

  return {
    allNewYorkTimesData: data?.results || [],
    isLoadingNewYorkTimesData: !error && !data,
    isErrorNewYorkTimesData: error,
  }
}

export function useFetchTheGuardianData() {
  const { data, error } = useSWR(theGuardianAPiUrl, fetcher)

  return {
    allTheGuardianData: data?.response?.results || [],
    isLoadingTheGuardianData: !error && !data,
    isErrorTheGuardianData: error,
  }
}

export function useFetchSearchResultData(
  searchQuery: string,
  category: string,
) {
  const newsApiSearchByQueryUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=a3906f4f790f4f2b8c917eb2f3a5621d`
  const NYTimesSearchByQueryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&api-key=uvXeQ3yYDdhDsKcSfRWkUAtOHN6tIVYe`
  const theGuardianSearchByQueryUrl = `https://content.guardianapis.com/search?q=${searchQuery}&page-size=20&show-fields=thumbnail&api-key=50887b5b-52a9-435f-b5e2-fd0a17568d18`

  const newsApiSearchByCategory = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=a3906f4f790f4f2b8c917eb2f3a5621d`
  const NYTimesSearchByCategory = `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?api-key=uvXeQ3yYDdhDsKcSfRWkUAtOHN6tIVYe`
  const theGuardianSearchByCategory = `https://content.guardianapis.com/search?section=${category}&page-size=20&show-fields=thumbnail&api-key=50887b5b-52a9-435f-b5e2-fd0a17568d18`

  const newsApiSearchByQueryAndCategory = `https://newsapi.org/v2/top-headlines?country=us&q=${searchQuery}&category=${category}&apiKey=a3906f4f790f4f2b8c917eb2f3a5621d`
  const theGuardianSearchByQueryAndCategory = `https://content.guardianapis.com/search?q=${searchQuery}&section=${category}&show-fields=thumbnail&api-key=50887b5b-52a9-435f-b5e2-fd0a17568d18`

  const newsApiSearchUrl =
    searchQuery.length > 0 && category?.length > 0
      ? newsApiSearchByQueryAndCategory
      : category?.length > 0
      ? newsApiSearchByCategory
      : searchQuery.length > 0 && newsApiSearchByQueryUrl

  const NYTimesSearchUrl =
    searchQuery.length > 0 && category?.length > 0
      ? ''
      : category?.length > 0
      ? NYTimesSearchByCategory
      : searchQuery.length > 0 && NYTimesSearchByQueryUrl

  const theGuardianSearchUrl =
    searchQuery.length > 0 && category?.length > 0
      ? theGuardianSearchByQueryAndCategory
      : category?.length > 0
      ? theGuardianSearchByCategory
      : searchQuery.length > 0 && theGuardianSearchByQueryUrl

  const { data: newsApiData, error: error1 } = useSWR(newsApiSearchUrl, fetcher)
  const { data: nYTimesApiData, error: error2 } = useSWR(
    NYTimesSearchUrl,
    fetcher,
  )
  const { data: theGuardianApiData, error: error3 } = useSWR(
    theGuardianSearchUrl,
    fetcher,
  )

  const mergedArray = [
    ...(newsApiData?.articles ?? []),
    ...(nYTimesApiData?.response?.docs ?? nYTimesApiData?.articles ?? []),
    ...(theGuardianApiData?.response?.results ??
      theGuardianApiData?.response?.docs ??
      []),
  ]

  return {
    searchResultData: mergedArray,
    isSearchResultLoading:
      (error1 || error2 || error3) &&
      (!newsApiData || !nYTimesApiData || !theGuardianApiData),
    isSearchResultError: error1 || error2 || error3,
  }
}

export function useFetchNYTimesSectionListData() {
  const NYTimesSectionUrl =
    'https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=uvXeQ3yYDdhDsKcSfRWkUAtOHN6tIVYe'

  const { data, error } = useSWR(NYTimesSectionUrl, fetcher)

  return {
    NYTimesSectionListData: data?.results || [],
    isNYTimesSectionListDataLoading: !error && !data,
    isNYTimesSectionListDataError: error,
  }
}

export function useFetchTheGuardianSectionListData() {
  const NYTimesSectionUrl =
    'https://content.guardianapis.com/sections?api-key=50887b5b-52a9-435f-b5e2-fd0a17568d18'

  const { data, error } = useSWR(NYTimesSectionUrl, fetcher)

  return {
    TheGuardianSectionListData: data?.response?.results || [],
    isTheGuardianSectionListDataLoading: !error && !data,
    isTheGuardianSectionListDataError: error,
  }
}