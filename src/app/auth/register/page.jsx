import React from 'react'

export default function page() {
  return (
    <div>
      <h1>Register</h1>
      <form action="" method="post">
        <input type="text" name="username" id="username" placeholder="Username" />
        <input type="text" name="email" id="email" placeholder="Email" />
        <input type="password" name="password" id="password" placeholder="Password" />

      </form>
    </div>
  )
}
