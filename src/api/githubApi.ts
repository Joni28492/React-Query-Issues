import axios from "axios";

export const githubApi = axios.create({
    baseURL:'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})