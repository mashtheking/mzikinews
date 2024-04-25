export const Card = ({ item }: any) => {
  const startsWithStatic01Nyt = (url: string) => {
    return url.startsWith('https://static01.nyt.com/')
  }

  const nyTimesImageUrl =
    item?.multimedia &&
    item?.multimedia[2]?.url &&
    startsWithStatic01Nyt(item?.multimedia[2]?.url)
      ? item?.multimedia[2]?.url
      : item?.multimedia?.length > 0
      ? 'https://static01.nyt.com/' + item?.multimedia[2]?.url
      : ''

  const articleAuthor = item.author
    ? item.author?.substring(0, 30)
    : item?.source?.name
    ? item?.source?.name?.substring(0, 30)
    : item?.byline?.original
    ? item?.byline?.original.substring(0, 30)
    : item?.byline?.length > 0
    ? item?.byline?.substring(0, 30)
    : item?.sectionName
    ? item?.sectionName?.substring(0, 30)
    : item?.subsection?.substring(0, 30)

  const articleTitle = item?.title
    ? item?.title
    : item?.webTitle
    ? item?.webTitle
    : item?.abstract

  const articleImageUrl = item.urlToImage
    ? item.urlToImage
    : item?.fields?.thumbnail
    ? item?.fields?.thumbnail
    : nyTimesImageUrl

  return (
    <div className='rounded-md overflow-hidden shadow-lg cursor-pointer'>
      <div
        className='w-full h-64 object-center bg-cover bg-center'
        style={{
          backgroundImage: `url(${
            articleImageUrl ? articleImageUrl : '/src/assets/images/news.jpg'
          })`,
        }}
      ></div>
      <img
        className='w-full h-64 object-center bg-cover hidden'
        src={item.urlToImage}
        alt={`cover of "${item.title}" by ${item.author}`}
      />
      <div className='px-6 py-2'>
        <div className='flex flex-col items-center'>
          <h1 className='py-2 px-4 rounded-lg text-center text-lg tracking-tighter font-bold bg-[#003366] text-white'>
            {articleAuthor}
          </h1>
          <h2 className='text-base tracking-tighter mt-1 text-center font-bold'>
            {articleTitle}
          </h2>
        </div>
      </div>
    </div>
  )
}
