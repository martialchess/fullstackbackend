const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    name,
    email,
    message,
  };

  try {
    const response = await fetch('https://api.ridamalikdev.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.status === 200) {
      // Success logic here
      console.log('Message sent successfully!');
    } else {
      // Error handling here
      console.error('Error sending message:', result.error);
    }
  } catch (error) {
    console.error('Network or Server error:', error);
  }
};
