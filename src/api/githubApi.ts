import axios from "axios";

export const githubApi = axios.create({
    baseURL:'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
        //si falla es porque expiro el token
    }
})