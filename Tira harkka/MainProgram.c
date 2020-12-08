/* 
	Author: Vili Huusko 0544718
	Date: 7.12.2020
	Last updated: 8.12.2020

	Source(s):
	Goel, A. 2020, Print Binary Tree in 2-Dimensions, GeeksforGeeks, [Website]. [Updated 11.02.2020]. [Referred 7.12.2020]. Available: https://www.geeksforgeeks.org/print-binary-tree-2-dimensions/.
	Kaarna, A. 2020, Harjoitus 8-A, Moodle, [Website]. [Updated 27.10.2020]. [Referred 7.12.2020]. Available: https://moodle.lut.fi/mod/page/view.php?id=91766 (Requires LUT login).
*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define SIZE 100
#define COUNT 10

typedef struct node {
	int value;
	int state;
	struct node* left;
	struct node* right;
} node, *nodePtr;

void addNode(nodePtr*, int, int*);
void rightRotation(nodePtr*, int*);
void leftRotation(nodePtr*, int*);
void printTree(nodePtr, int);
void readFile(char *, nodePtr*, int *);
int findKey(node*, int);
int getNumberFromUser(void);
void printMenu(void);
void findKeyWrapper(nodePtr , int);
void addRandomKeys(nodePtr*, int, int *);
void deleteTree(nodePtr*);

int main(void) {
	/* Init vars */
	int unb = 0;
	nodePtr tree = NULL;

	int j;
	while (1) {
		printMenu();
		switch(getNumberFromUser()) {
			case 0:
				printf("Invalid choice.\n");
				break;
			case 1:
				printf("Exiting program.\n");
				exit(0);
				break;
			case 2:
				printf("Running test program.\n");
				/* Gets the numbers from the file and prints them */
				readFile("Defaults.txt", &tree, &unb);

				printf("Formed tree: ");
				printTree(tree, 0);
				printf("\n");

				/* Perform search operations */
				findKeyWrapper(tree, 6);
				findKeyWrapper(tree, 1);
				findKeyWrapper(tree, 10);
				findKeyWrapper(tree, 16);

				/*Add the numbers  26, 24, 22, 20, 18, 16 to the tree */
				addNode(&tree, 26, &unb);
				addNode(&tree, 24, &unb);
				addNode(&tree, 22, &unb);
				addNode(&tree, 20, &unb);
				addNode(&tree, 18, &unb);
				addNode(&tree, 16, &unb);
				printf("\n");
				printTree(tree, 0);
				printf("\n");

				/* Perform search operations */
				findKeyWrapper(tree, 10);
				findKeyWrapper(tree, 26);
				findKeyWrapper(tree, 32);
				break;
			case 3:
				printf("Input a key: ");
				j = getNumberFromUser();
				if (j > 0) {
					addNode(&tree, j, &unb);
					printTree(tree, 0);
					printf("\n");
				}
				else {
					printf("Invalid key.\n");
				}
				break;
			case 4:
				printf("Enter a file name: ");
				char fileName[100];
				scanf("%s", fileName);
				readFile(fileName, &tree, &unb);
				break;
			case 5:
				printf("Input a key: ");
				j = getNumberFromUser();
				findKeyWrapper(tree, j);
				break;
			case 6:
				printTree(tree, 0);
				break;
			case 7:
				printf("Enter amount: ");
				j = getNumberFromUser();
				addRandomKeys(&tree, j, &unb);
				break;
			case 8:
				deleteTree(&tree);
				printf("Tree emptied.\n");
				break;
			default:
				printf("Unknown choice.\n");
				break;
		}
	}

	/* Suspends execution */
	getchar();
	return 0;
}

void printMenu() {
	printf("\n1) Exit program.\n");
	printf("2) Run demo program\n");
	printf("3) Add a key to the tree\n");
	printf("4) Add keys from a file\n");
	printf("5) Search for a key\n");
	printf("6) Print current Tree.\n");
	printf("7) Add random keys.\n");
	printf("8) Delete tree.\n");
	printf("Enter your choice: ");
}

int getNumberFromUser() {
	char s[100];
	scanf("%s", s);
	return atoi(s);
}

void addRandomKeys(nodePtr* tree, int amount, int *unb) {
	srand(time(NULL));
	int i;
	int j;
	for (i = 0; i < amount; i++) {
		j = rand() % amount;
		addNode(tree, j, unb);
	}
}

        	/* (Goel 2020) */
/* Function to print binary tree in 2D 
   It does reverse inorder traversal */
void printTree(node* root, int space) {
	int i;
	if (root == NULL)
		return;
	/* Increase distance between levels */ 
	space += COUNT;

	/* Process right child first */
	printTree(root->right, space);

	/* Print current node after space 
	   count */
	printf("\n");
	for (i = COUNT; i < space; i++)
		printf(" ");
	printf("%d", root->value);

	/* Process left child */
	printTree(root->left, space);
}

void addNode(nodePtr* parent, int value, int* unb) {
	/* If the tree is empty */
	if (!(*parent)) {
		*unb = 1;
		/* Malloc */
		if (!(*parent = (nodePtr)malloc(sizeof(node)))) {
			perror("Could not allocate memory.");
			exit(1);
		}
		/* Initialize node */
		(*parent)->left = NULL;
		(*parent)->right = NULL;
		(*parent)->state = 0;
		(*parent)->value = value;
	}
	/* If the added number is less than the parent's number (is added to the left of the parent) */
	else if (value < (*parent)->value) {
		addNode(&(*parent)->left, value, unb);
		if (*unb == 1) {
			switch ((*parent)->state) {
				case -1:
					(*parent)->state = 0;
					*unb = 0;
					break;
				case 0:
					(*parent)->state = 1;
					break;
				case 1:
					leftRotation(parent, unb);
			}
		}
	}
	/* If the added number is greater than the parent's number (is added to the right of the parent) */
	else if (value > (*parent)->value) {
		addNode(&(*parent)->right, value, unb);
		if (*unb == 1) {
			switch ((*parent)->state) {
				case 1:
					(*parent)->state = 0;
					*unb = 0;
					break;
				case 0:
					(*parent)->state = -1;
					break;
				case -1:
					rightRotation(parent, unb);
			}
		}
	}
	else {
		*unb = 0;
		printf("The key %d already exists in current tree.\n", value);
	}
}

void leftRotation(nodePtr* parent, int* unb) {
	nodePtr child;
	nodePtr grandChild;
	child = (*parent)->left;

	/* LL-rotation */
	if (child->state == 1) {
		printf("Subtree before LL-Rotation:\n");
		printTree(*parent, 0);
		printf("\n");

		(*parent)->left = child->right;
		child->right = *parent;
		(*parent)->state = 0;
		(*parent) = child;

		printf("\nSubtree after LL-Rotation:\n");
		printTree(*parent, 0);
		printf("\n");
	}
	/* LR-rotation */
	else {
		printf("Subtree before LR-Rotation:\n");
		printTree(*parent, 0);
		printf("\n");

		grandChild = child->right;
		child->right = grandChild->left;
		grandChild->left = child;
		(*parent)->left = grandChild->right;
		grandChild->right = *parent;
		switch (grandChild->state) {
		case -1:
			(*parent)->state = 0;
			child->state = 1;
			break;
		case 0:
			(*parent)->state = 0;
			child->state = 0;
			break;
		case 1:
			(*parent)->state = -1;
			child->state = 0;
			break;
		}
		*parent = grandChild;
		printf("\nSubtree after LR-Rotation:\n");
		printTree(*parent, 0);
		printf("\n");
	}
	(*parent)->state = 0;
	*unb = 0;
}

void rightRotation(nodePtr* parent, int* unb) {
	nodePtr child;
	nodePtr grandChild;
	child = (*parent)->right;

	/* RR-rotation */
	if (child->state == -1) {
		printf("Subtree before RR-Rotation:\n");
		printTree(*parent, 0);
		printf("\n");

		(*parent)->right = child->left;
		child->left = *parent;
		(*parent)->state = 0;
		(*parent) = child;

		printf("\nSubtree after RR-Rotation:\n");
		printTree(*parent, 0);
		printf("\n");
	}
	/* RL-rotation */
	else {
		printf("Subtree before RL-Rotation:\n");
		printTree(*parent, 0);

		grandChild = child->left;
		child->left = grandChild->right;
		grandChild->right = child;
		(*parent)->right = grandChild->left;
		grandChild->left = *parent;
		switch (grandChild->state) {
		case -1:
			(*parent)->state = 1;
			child->state = 0;
			break;
		case 0:
			(*parent)->state = 0;
			child->state = 0;
			break;
		case 1:
			(*parent)->state = 0;
			child->state = -1;
			break;
		}
		*parent = grandChild;

		printf("\nSubtree after RL-Rotation:\n");
		printTree(*parent, 0);
		printf("\n");
	}
	(*parent)->state = 0;
	*unb = 0;
}

void findKeyWrapper(nodePtr tree, int j) {
	if (j > 0) {
		if (findKey(tree, j)) {
			printf("Key %d was found in the tree.\n", j);
		}
		else {
			printf("Key %d was not found in the tree.\n", j);
		}
	}
	else {
		printf("Invalid key value.\n");
	}
}

/* Finds the given key from the tree. Complexity O(log_2(n)) */
int findKey(node* parent, int key) {
	/* If the tree doesn't exist */
	if (parent == NULL) {
		return 0;
	}
	/* If the given node has the key in search */
	if (parent->value == key) {
		return 1;
	}
	/* If the key is greater than the given node -> search right */
	else if (key > parent->value && parent->right != NULL) {
		if (findKey(parent->right, key) == 1) {
			return 1;
		}
	}
	/* If the key is less than the given node -> search left */
	else if (key < parent->value && parent->left != NULL) {
		if (findKey(parent->left, key) == 1) {
			return 1;
		}
	}
	/* If the key doesn't exist in the tree */
	else
		return 0;
	return 0;
}

void deleteTree(nodePtr* parent) {
    if (*parent == NULL) {
        return;
    }
    deleteTree(&(*parent)->left);
    deleteTree(&(*parent)->right);
    free(*parent);
    *parent = NULL;
}

/* Reads the given file and adds the numbers to the tree */
void readFile(char *fileName, nodePtr* tree, int *unb) {
    FILE *file;
    int i;

    if ((file = fopen(fileName, "r")) == NULL) {
        printf("Could not open file\n");
        return;
    }

    /* Get numbers from the file and add them to the array */
    fscanf(file, "%d", &i);
    while (!feof(file)) {
		addNode(tree, i, unb);
        fscanf(file, "%d", &i);
    }
    fclose(file);
}