export const sendToken=(user,statusCode,res)=>{

    const token=user.getToken()

    const tokenOptions={
            expires:new Date(Date.now() + 24 * 60 * 60 * 1000) ,
            httpOnly:true,
            secure:true,
            sameSite:'None'
        }

    return res.status(statusCode).cookie("token",token,tokenOptions).json({
        user,
        token,
        success:true
    })

}