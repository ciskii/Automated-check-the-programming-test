# Teacher's Params
a = 5
b = 10

# Student answer
# 2 params (int, int)
# return int
def student_answer(a, b):
  return (a + b)

# Teacher's solution
def solution(a, b):
  return (a + b)

if solution(a, b) == student_answer(a, b):
  print('T')
else: 
  print('F')
