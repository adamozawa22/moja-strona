<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Księga Gości</title>
  <style>
    body { background: black; color: lime; font-family: monospace; text-align:center; }
    form { margin:20px auto; padding:10px; background:#111; border:2px solid cyan; width:300px; border-radius:10px; }
    input, textarea, button { width:90%; margin:5px 0; padding:5px; border-radius:5px; border:none; }
    textarea { height:80px; }
    button { background: cyan; color: black; font-weight: bold; cursor:pointer; }
    .message { border:1px solid cyan; padding:5px; margin:5px auto; width:60%; background:#222; border-radius:5px; }
  </style>
</head>
<body>
  <h1>📖 Księga Gości</h1>
  <form id="guestForm">
    <input type="text" name="name" placeholder="Twoje imię" required>
    <textarea name="message" placeholder="Twoja wiadomość" required></textarea>
    <button type="submit">Wyślij</button>
  </form>

  <div id="guestbook"></div>

  <script>
    async function loadEntries() {
      const res = await fetch('/.guestbook');
      const data = await res.json();
      const guestbook = document.getElementById('guestbook');
      guestbook.innerHTML = '';
      data.forEach(e => {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<strong>${e.name}</strong>: ${e.message}<br><small>${new Date(e.created_at).toLocaleString()}</small>`;
        guestbook.appendChild(div);
      });
    }

    async function saveEntry(event) {
      event.preventDefault();
      const name = document.querySelector('[name="name"]').value;
      const message = document.querySelector('[name="message"]').value;

      await fetch('/.netlify/functions/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
      });

      document.querySelector('#guestForm').reset();
      loadEntries();
    }

    document.querySelector('#guestForm').addEventListener('submit', saveEntry);
    loadEntries();
  </script>
</body>
</html>
