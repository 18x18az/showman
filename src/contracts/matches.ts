import { Post } from "@/utils/maestro"

export async function uploadMatches (file: File) {
    const formData = new FormData()
    formData.append(
        'file',
        file,
        file.name)
    await Post('matches/quals', formData)
}