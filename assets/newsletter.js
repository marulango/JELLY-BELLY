document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('newsletter-email').value;
    const message = document.getElementById('newsletter-message');

    try {
      const response = await fetch('https://a.klaviyo.com/client/subscriptions/?company_id=W9yCV3', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'revision': '2023-12-15'
        },
        body: JSON.stringify({
          data: {
            type: 'subscription',
            attributes: {
              profile: {
                data: {
                  type: 'profile',
                  attributes: { email: email }
                }
              }
            },
            relationships: {
              list: {
                data: { type: 'list', id: 'YfyxHi' }
              }
            }
          }
        })
      });

      if (response.ok) {
        message.textContent = form.dataset.success;
        message.classList.remove('hidden', 'text-red-400');
        message.classList.add('text-brand');
        document.getElementById('newsletter-email').value = '';
      } else {
        throw new Error();
      }
    } catch {
      message.textContent = form.dataset.error;
      message.classList.remove('hidden', 'text-brand');
      message.classList.add('text-red-400');
    }
  });
});
