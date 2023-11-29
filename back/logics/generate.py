import string
import secrets, random


class Gen_Pass:
    def __init__(self, length, numbers, uppercase, lowercase, symbols, delimiter, delimiter_value, **kwargs):
        self.base_kit = {
            'numbers': string.digits,
            'uppercase': string.ascii_uppercase,
            'lowercase': string.ascii_lowercase,
            'symbols': '!#$&?'
        }
        self.start_kit = ''

        self.length = length
        self.numbers = numbers
        self.uppercase = uppercase
        self.lowercase = lowercase
        self.symbols = symbols
        self.delimiter = delimiter
        self.delimiter_value = delimiter_value

    def check_data(self):
        if self.delimiter and self.delimiter_value in [4,5,6]:
            if self.delimiter_value == 4:
                if self.length in [9, 14, 19]:
                    return True
            if self.delimiter_value == 5:
                if self.length in [11, 17, 23]:
                    return True
            if self.delimiter_value == 6:
                if self.length in [13, 20, 27]:
                    return True
        return False

    def create_set(self):
        test1 =[26,10,10,52]
        test2 = [1,1,3,1]
        ves = test2
        if self.numbers:
            self.start_kit += self.base_kit.get('numbers') * ves[0]
        if self.uppercase:
            self.start_kit += self.base_kit.get('uppercase') * ves[1]
        if self.lowercase:
            self.start_kit += self.base_kit.get('lowercase') * ves[2]
        if self.symbols:
            self.start_kit += self.base_kit.get('symbols') * ves[3]
        self.start_kit = list(self.start_kit)
        random.shuffle(self.start_kit)
        return self.start_kit
    
    def create_pass(self):
        self.length -= self.length % self.delimiter_value
        raz = self.delimiter_value
        res =''

        while self.length:
            if raz == 0:
                res += '-'
                raz = self.delimiter_value
            res += random.choice(self.start_kit)
            self.length -= 1
            raz -= 1
        return res

    def check_pass(self):
        pass
    
    def main(self):
        if self.check_data():
            self.create_set()
            return self.create_pass()
        return 'Неправильные параметры'

        
        
# qwrq-qwrq
# qwrq-qwrq-rerg
# qwrq-qwrq-rerg
# qwrq-qwrq-rerg-rerg
# qwrq-qwrq-rerg-rerg

# grhrd-dfgrd
# grhrd-dfgrd-rgwer
# grhrd-dfgrd-rgwer-dfgrd
# atelgk-asdweq
# atelgk-asdweq-atelgk
# atelgk-asdweq-atelgk-asdweq

example = {
    'length': 23,
    'numbers': True,
    'uppercase': True,
    'lowercase': True,
    'symbols': True,
    'delimiter': True,
    'delimiter_value': 5
    }

# print(Gen_Pass(**example).main())
# print(Gen_Pass(**example).main())
# print(Gen_Pass(**example).main())
