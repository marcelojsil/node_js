async function formContato(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Enviar dados para o FormSubmit
    fetch(form.action, {
        method: form.method,
        body: formData
    });

    // Enviar dados para o servidor Node.js
    fetch('http://localhost:3000/form_contato', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    //alert('Formulário enviado com sucesso!');
    window.location.href = '/obrigado';
}