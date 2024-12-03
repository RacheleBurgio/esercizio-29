import React, { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = ({ asin }) => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/' + asin,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4N2QwMjA2ZmM4YzAwMTU2Yjg3MjMiLCJpYXQiOjE3MzI4MDM4NDIsImV4cCI6MTczNDAxMzQ0Mn0.ZCRIxrp_5MIoCMJTfj38dW3jv9GRrXxu6laRfiVqFFY',
            },
          }
        )
        if (response.ok) {
          const comments = await response.json()
          setComments(comments)
          setIsError(false)
        } else {
          setIsError(true)
        }
      } catch (error) {
        console.error(error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (asin) {
      fetchComments()
    }
  }, [asin])

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={asin} />
      <CommentList commentsToShow={comments} />
    </div>
  )
}

export default CommentArea
