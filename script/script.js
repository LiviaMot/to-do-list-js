const taskForm = document.getElementById('task-form')
const taskInput = document.getElementById('task-input')
const taskList = document.getElementById('task-list')
const btnClear = document.getElementById('clear-all-btn')

// Função para adicionar tarefas
function addTask() {
  // Pega o texto do input
  const taskText = taskInput.value
  
  // Validação
  if (taskText.trim() === '') {
    alert('Por favor, digite uma tarefa!')
    return
  }
  
  // cria um li para adicionar a tarefa para a list
  const newTaskItem = document.createElement('li')
  
  // Cria um <span> para o texto (para separar do botão)
  const taskTextSpan =document.createElement('span')
  taskTextSpan.textContent = taskText
  
  // Cria o botão de deletar
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'X'
  deleteButton.classList.add('delete-btn')
  
  // Adiciona o texto e o botão DENTRO do <li>
  newTaskItem.appendChild(taskTextSpan)
  newTaskItem.appendChild(deleteButton)
  
  // Adiciona o <li> completo à lista <ul>
  taskList.appendChild(newTaskItem)

  // Limpa o input e foca nele
  taskInput.value = ''
  taskInput.focus()
}

// --- EVENTOS ---

// Adicionar a tarefa
taskForm.addEventListener('submit', function(event) {
  // impede de recarregar a página
  event.preventDefault()
  addTask()
})

// Evento de tecla 'Enter'
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    addTask()
  }
})

// Deletar/completar
taskList.addEventListener('click', (event) => {
  // alvo do clique
  const target = event.target

  // VERIFICAÇÃO #1: O clique foi no botão de deletar?
  // Checamos se o alvo (target) tem a classe 'delete-btn'.
  if (target.classList.contains('delete-btn')) {
    // Se sim, sobe para o <li> pai e o remove.
    target.parentElement.remove()
    return
  }

  // VERIFICAÇÃO #2: O clique foi em qualquer outro lugar dentro de um <li>?
  // Usamos .closest() para encontrar o <li> pai mais próximo do local do clique.
  const taskItem = target.closest('li')
  if (taskItem) {
    // Aplica/remove a classe 'completed' no <li> encontrado
    taskItem.classList.toggle('completed')
  }
})

// Botão de Limpar todas as tarefas
btnClear.addEventListener('click', () => {
  // Pega todos os li's
  const allTasks = document.querySelectorAll('#task-list li')

  for (const task of allTasks) {
    task.remove()
  }
})