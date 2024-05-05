document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const dataTable = document.getElementById('dataTable');
    const tbody = dataTable.querySelector('tbody');

    searchInput.addEventListener('input', function () {
        const query = this.value;

        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `query=${query}`
        })
        .then(response => response.json())
        .then(data => {

            tbody.innerHTML = '';

            data.forEach(fila => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><img src="{{ url_for('static', filename='uploads/' + fila[7]) }}" alt="${fila[6]}"></td>
                    <td>${fila[1]}</td>
                    <td>${fila[2]}$</td>
                    <td>${fila[3]}%</td>
                    <td>${(fila[4] < 6) ? '<span class="red">' + fila[4] + '</span>' : fila[4]}</td>
                    <td>${fila[6]}</td>
                    <td>
                        <a href="/edit/${fila[0]}"><button id="edit">Editar</button></a>
                        <a href="/remove_art/${fila[0]}"><button id="remove" class="Borrar" value="${fila[0]}">Borrar</button></a>
                    </td>`;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error));
    });
});