import string
import secrets, random


class Gen_Pass:
    def __init__(self, len, numbers, uppercase, lowercase, symbols, delimiter):
        self.base_kit = {
            'numbers': string.digits,
            'uppercase': string.ascii_uppercase,
            'lowercase': string.ascii_lowercase,
            'symbols': '!#$&?'
        }
        self.start_kit = ''

        self.len = len
        self.numbers = numbers
        self.uppercase = uppercase
        self.lowercase = lowercase
        self.symbols = symbols
        self.delimiter = delimiter

    def check_data(self):
        if self.delimiter.get('key') and self.delimiter.get('value') in [4,5,6]:
            if self.delimiter.get('value') == 4:
                if self.len in [9, 14, 19]:
                    return True
            if self.delimiter.get('value') == 5:
                if self.len in [11, 17, 23]:
                    return True
            if self.delimiter.get('value') == 6:
                if self.len in [13, 20, 27]:
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
        self.len -= self.len % self.delimiter.get('value')
        raz = self.delimiter.get('value')
        res =''

        while self.len:
            if raz == 0:
                res += '-'
                raz = self.delimiter.get('value')
            res += random.choice(self.start_kit)
            self.len -= 1
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
    'len': 23,
    'numbers': True,
    'uppercase': True,
    'lowercase': True,
    'symbols': True,
    'delimiter': {
        'key': True,
        'value': 5},
}

print(Gen_Pass(**example).main())
print(Gen_Pass(**example).main())
print(Gen_Pass(**example).main())
