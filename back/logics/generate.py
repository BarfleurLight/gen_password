import string
import secrets
import random


class Gen_Pass:
    def __init__(self, length, numbers,
                 uppercase, lowercase, symbols,
                 delimiter, delimiter_value, **kwargs):
        self.base_kit = {
            'numbers': string.digits,
            'uppercase': string.ascii_uppercase,
            'lowercase': string.ascii_lowercase,
            'symbols': '!#$&?'
        }
        self.start_kit = ''
        self.start_kit_list = []

        self.length = length
        self.numbers = numbers
        self.uppercase = uppercase
        self.lowercase = lowercase
        self.symbols = symbols
        self.delimiter = delimiter
        self.delimiter_value = delimiter_value

    def check_delimiter(self):
        if not self.delimiter:
            return True
        if self.delimiter and self.delimiter_value in [4, 5, 6]:
            if self.delimiter_value == 4:
                if self.length in [4, 9, 14, 19]:
                    return True
            if self.delimiter_value == 5:
                if self.length in [5, 11, 17, 23]:
                    return True
            if self.delimiter_value == 6:
                if self.length in [6, 13, 20, 27]:
                    return True
        return False

    def create_set(self):
        ves = [1, 1, 3, 1]
        if self.numbers:
            self.start_kit += self.base_kit.get('numbers') * ves[0]
            self.start_kit_list.append(self.base_kit.get('numbers'))
        if self.uppercase:
            self.start_kit += self.base_kit.get('uppercase') * ves[1]
            self.start_kit_list.append(self.base_kit.get('uppercase'))
        if self.lowercase:
            self.start_kit += self.base_kit.get('lowercase') * ves[2]
            self.start_kit_list.append(self.base_kit.get('lowercase'))
        if self.symbols:
            self.start_kit += self.base_kit.get('symbols') * ves[3]
            self.start_kit_list.append(self.base_kit.get('symbols'))

        self.start_kit = list(self.start_kit)
        random.shuffle(self.start_kit)
        return self.start_kit

    def create_pass(self):
        raz = -1
        lenght = self.length
        if self.delimiter:
            lenght -= lenght % self.delimiter_value
            raz = self.delimiter_value
        res = ''

        while lenght:
            if raz == 0:
                res += '-'
                raz = self.delimiter_value
            symbol = secrets.choice(self.start_kit)
            if (len(res) > 0) and (res[0] == symbol):
                continue
            res += symbol
            lenght -= 1
            raz -= 1
        return res

    def check_pass(self, password: str):
        test = []

        for value in self.start_kit_list:
            test.append(any(char in password for char in value))

        return all(test)

    def main(self):
        if not self.check_delimiter():
            return 'Неправильные параметры'
        self.create_set()

        check_pass = False
        while not check_pass:
            password = self.create_pass()
            check_pass = self.check_pass(password)
        return password
