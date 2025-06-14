export function showCurrentAge() {
    const birthday = new Date("2008/04/30");
    const today = new Date();

    let years = today.getFullYear() - birthday.getFullYear();
    let months = today.getMonth() - birthday.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < birthday.getDate())) {
        years--;
        months += 12;
    }

    if (today.getDate() < birthday.getDate()) {
        months--;
        if (months < 0) {
            months += 12;
            years--;
        }
    }

    return years;
}