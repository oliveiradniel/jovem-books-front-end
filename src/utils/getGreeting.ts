export function getGreeting({ name }: { name: string }) {
  const currentTime = new Date().getHours();

  let greeting;

  if (currentTime >= 6 && currentTime < 12) {
    greeting = 'Bom dia';
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = 'Boa tarde';
  } else {
    greeting = 'Boa noite';
  }

  return `${greeting} ${name}`;
}
