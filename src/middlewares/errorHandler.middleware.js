
const errorHandlerMiddleware = async (err, req, res, next) => {

    const statusCode = err.statusCode || 400
    const message = err.message || "Something went wrong"

    return res.status(statusCode).json({
        message: message,
        success:false
    })
}

export default errorHandlerMiddleware;