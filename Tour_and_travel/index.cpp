class Stack {
    int top;
    int maxSize;
    int* array;

public:
    Stack(int size) {
        maxSize = size;
        array = new int[maxSize];
        top = -1;
    }

    ~Stack() {
        delete[] array;
    }

    bool push(int item) {
        if (top >= maxSize - 1) {
            cout << "Stack Overflow\n";
            return false;
        }
        array[++top] = item;
        return true;
    }

    int pop() {
        if (top < 0) {
            cout << "Stack Underflow\n";
            return -1;
        }
        return array[top--];
    }

    int peek() {
        if (top < 0) {
            cout << "Stack is Empty\n";
            return -1;
        }
        return array[top];
    }

    bool isEmpty() {
        return top < 0;
    }

    bool isFull() {
        return top >= maxSize - 1;
    }
};



int main() {
    Stack stack(5);

    stack.push(10);
    stack.push(20);
    stack.push(30);

    cout << stack.pop() << " popped from stack\n";
    cout << "Top element is " << stack.peek() << endl;

    return 0;
}
