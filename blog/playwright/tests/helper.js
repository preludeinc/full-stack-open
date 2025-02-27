const loginWith = async (page, username, password) => {
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill(username)
    await textboxes[1].fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url, likes) => {
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill(title)
    await textboxes[1].fill(author)
    await textboxes[2].fill(url)
    await textboxes[3].fill(likes)
    await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }