export default function ImageValidator(e) {
    let { files } = e.target
    if (files.length === 0)
        return "Pic field is Mandatory"
    else if (files.length === 1) {
        let file = files[0]
        if (file.size > 1048576)
            return "Pic is too high. Please upload a file upto 1mb"
        else if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/webp" || file.type === "image/png" || file.type === "image/gif")
            return ""
        else
            return "Invalid Pic. Please upload .jpeg/jpg/png/gif/webp format"
    }
    else {
        var errorMessage = []
        Array.from(e.target.files).forEach((file, index) => {
            if (file.size > 1048576)
                errorMessage.push(`Pic ${index + 1} is too high. Please upload a file upto 1mb. `)
            else if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/webp" || file.type === "image/png" || file.type === "image/gif");
            else
                errorMessage.push(`Pic ${index + 1} is Invalid, Please upload .jpeg/jpg/png/gif/webp format`)
        })
        console.log(errorMessage);
        return errorMessage.length === 0 ? "" : errorMessage.toString()
    }
}
