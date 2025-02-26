import { render, screen } from '@vitejs/plugin-react'
import Blog from './Blog'

const encoder = new TextEncoder();
console.log(encoder.encode('test'))

test('renders content', () => {
  const blog = {
    title: 'Krebs on Security',
    author: 'Brian Krebs',
    likes: 20,
    url: 'https://krebsonsecurity.com',
    id: ''
  }
  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing with react-testing-library')
  expect(element).toBeDefined()
})